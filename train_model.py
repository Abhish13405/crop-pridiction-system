import os
import json
import numpy as np
import pandas as pd
from PIL import Image
import tensorflow as tf
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import classification_report
from tensorflow.keras.applications.mobilenet_v2 import MobileNetV2, preprocess_input
from tensorflow.keras.models import Model
from tensorflow.keras.layers import GlobalAveragePooling2D, Dense, Dropout, BatchNormalization
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint, ReduceLROnPlateau

def main():
    print("=== Crop Prediction System - Model Training ===")
    
    DATA_DIR = "./Agricultural-crops/"
    if not os.path.exists(DATA_DIR):
        print(f"Error: Dataset directory {DATA_DIR} not found.")
        return

    # 1. Collect Image Paths and Labels
    print("\n1. Collecting image paths and labels...")
    image_paths = []
    labels = []
    
    crop_folders = [f for f in os.listdir(DATA_DIR) if os.path.isdir(os.path.join(DATA_DIR, f)) and not f.startswith(('.', 'myenv', 'venv'))]
    crop_folders.sort()

    for crop in crop_folders:
        crop_path = os.path.join(DATA_DIR, crop)
        for img_name in os.listdir(crop_path):
            if img_name.lower().endswith(('.png', '.jpg', '.jpeg')):
                image_paths.append(os.path.join(DATA_DIR, crop, img_name))
                labels.append(crop)

    df = pd.DataFrame({'Image_Path': image_paths, 'Crop_Label': labels})
    total_images = len(df)
    unique_crops = df['Crop_Label'].nunique()
    print(f"Total Images Found: {total_images}")
    print(f"Total Crop Classes: {unique_crops}")

    # 2. Encode Labels & Save Class Mapping
    print("\n2. Encoding class labels and saving class_indices.json...")
    encoder = LabelEncoder()
    y_int = encoder.fit_transform(labels)
    class_names = list(encoder.classes_)
    
    class_indices = {int(i): str(name) for i, name in enumerate(class_names)}
    with open('class_indices.json', 'w') as f:
        json.dump(class_indices, f, indent=4)
    print("Saved class_indices.json successfully.")

    # 3. Load & Preprocess Images
    print("\n3. Loading and preprocessing images for MobileNetV2...")
    X_list = []
    for path in image_paths:
        try:
            img = Image.open(path).convert('RGB')
            img = img.resize((224, 224))
            img_arr = np.array(img, dtype=np.float32)
            img_arr = preprocess_input(img_arr)  # MobileNetV2 scaling to [-1, 1]
            X_list.append(img_arr)
        except Exception as e:
            print(f"Warning: Could not read image {path}: {e}")
            
    X = np.array(X_list, dtype=np.float32)
    print(f"Features Array Shape: {X.shape}")

    # 4. Stratified Train-Test Split (1D labels for stratification)
    print("\n4. Performing Stratified Train-Test Split...")
    X_train, X_test, y_train_int, y_test_int = train_test_split(
        X, y_int, test_size=0.2, random_state=42, stratify=y_int
    )
    
    num_classes = len(class_names)
    y_train = to_categorical(y_train_int, num_classes=num_classes)
    y_test = to_categorical(y_test_int, num_classes=num_classes)

    print(f"X_train shape: {X_train.shape}, y_train shape: {y_train.shape}")
    print(f"X_test shape:  {X_test.shape},  y_test shape:  {y_test.shape}")

    # 5. Data Augmentation
    train_datagen = ImageDataGenerator(
        rotation_range=25,
        width_shift_range=0.2,
        height_shift_range=0.2,
        shear_range=0.15,
        zoom_range=0.2,
        horizontal_flip=True,
        fill_mode='nearest'
    )
    train_datagen.fit(X_train)

    # 6. Build Model Architecture
    print("\n5. Building MobileNetV2 Architecture...")
    base_model = MobileNetV2(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
    base_model.trainable = False  # Freeze base layers for initial feature extraction

    x = base_model.output
    x = GlobalAveragePooling2D()(x)
    x = BatchNormalization()(x)
    x = Dense(256, activation='relu')(x)
    x = Dropout(0.4)(x)
    output = Dense(num_classes, activation='softmax')(x)

    model = Model(inputs=base_model.input, outputs=output)

    # 7. Compile Model
    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=1e-3),
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )

    callbacks = [
        ModelCheckpoint('crop_recommendation_model.keras', monitor='val_accuracy', save_best_only=True, verbose=1),
        EarlyStopping(monitor='val_loss', patience=8, restore_best_weights=True, verbose=1),
        ReduceLROnPlateau(monitor='val_loss', factor=0.5, patience=3, min_lr=1e-6, verbose=1)
    ]

    # 8. Initial Training Phase
    print("\n6. Starting Phase 1 Training (Base Model Frozen)...")
    batch_size = 32
    epochs = 20
    
    history_phase1 = model.fit(
        train_datagen.flow(X_train, y_train, batch_size=batch_size),
        validation_data=(X_test, y_test),
        epochs=epochs,
        callbacks=callbacks
    )

    # 9. Fine-tuning Phase (Unfreeze top layers for better accuracy)
    print("\n7. Starting Phase 2 Fine-Tuning (Unfreezing Top Layers)...")
    base_model.trainable = True
    # Freeze all layers except the last 30
    for layer in base_model.layers[:-30]:
        layer.trainable = False

    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=1e-5),  # Low LR for fine-tuning
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )

    history_phase2 = model.fit(
        train_datagen.flow(X_train, y_train, batch_size=batch_size),
        validation_data=(X_test, y_test),
        epochs=15,
        callbacks=callbacks
    )

    # 10. Evaluation & Final Save
    print("\n8. Evaluating Best Saved Model...")
    best_model = tf.keras.models.load_model('crop_recommendation_model.keras')
    test_loss, test_acc = best_model.evaluate(X_test, y_test, verbose=0)
    
    print(f"\nFinal Test Loss:     {test_loss:.4f}")
    print(f"Final Test Accuracy: {test_acc * 100:.2f}%")

    # Classification Report
    y_pred_probs = best_model.predict(X_test)
    y_pred = np.argmax(y_pred_probs, axis=1)
    
    print("\nClassification Report:")
    print(classification_report(y_test_int, y_pred, target_names=class_names, zero_division=0))

    print("\nTraining complete! Artifacts created:")
    print(" - Model: crop_recommendation_model.keras")
    print(" - Class Mapping: class_indices.json")

if __name__ == '__main__':
    main()
