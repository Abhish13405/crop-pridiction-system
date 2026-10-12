from django.db import models
from django.contrib.auth.models import User

class Farm(models.Model):
    """Farmer's registered farm land profiles."""
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='farms')
    name = models.CharField(max_length=150, help_text="खेत का नाम (Farm Name)")
    location = models.CharField(max_length=200, default="वाराणसी, उत्तर प्रदेश", help_text="स्थान / जिला (Location)")
    area_acres = models.FloatField(default=3.0, help_text="खेत का रकबा एकड़ में (Area in Acres)")
    soil_type = models.CharField(max_length=100, default="दोमट मिट्टी (Loamy Soil)", help_text="मिट्टी का प्रकार (Soil Type)")
    irrigation_source = models.CharField(max_length=100, default="नलकूप / बोरवेल (Tube-well)", help_text="सिंचाई का साधन (Irrigation Source)")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.area_acres} एकड़)"

    class Meta:
        ordering = ['-created_at']
        verbose_name = "खेत (Farm)"
        verbose_name_plural = "खेत (Farms)"


class CropRecommendationRecord(models.Model):
    """Saved historical crop recommendations."""
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='crop_recommendations')
    farm = models.ForeignKey(Farm, on_delete=models.SET_NULL, null=True, blank=True, related_name='recommendations')
    farm_name = models.CharField(max_length=150, blank=True, default="सामान्य खेत (General Farm)")
    nitrogen = models.FloatField(help_text="नाइट्रोजन N (kg/ha)")
    phosphorus = models.FloatField(help_text="फास्फोरस P (kg/ha)")
    potassium = models.FloatField(help_text="पोटाश K (kg/ha)")
    ph = models.FloatField(default=6.5, help_text="मिट्टी का pH")
    temperature = models.FloatField(default=25.0, help_text="तापमान (°C)")
    humidity = models.FloatField(default=70.0, help_text="नमी (%)")
    rainfall = models.FloatField(default=100.0, help_text="वर्षा (mm)")
    recommended_crop = models.CharField(max_length=100, help_text="अनुशंसित फसल (Recommended Crop)")
    alternative_crops = models.JSONField(default=list, blank=True, help_text="वैकल्पिक फसलें (Alternative Crops)")
    confidence = models.FloatField(default=95.0, help_text="सटीकता / विश्वास स्कोर (%)")
    reason = models.TextField(blank=True, help_text="सलाह का वैज्ञानिक कारण (Agronomic Reason)")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.recommended_crop} - {self.created_at.strftime('%d %b %Y')}"

    class Meta:
        ordering = ['-created_at']
        verbose_name = "फसल सलाह रिकॉर्ड (Crop Recommendation Record)"
        verbose_name_plural = "फसल सलाह रिकॉर्ड (Crop Recommendation Records)"
