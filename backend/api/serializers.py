from rest_framework import serializers
from .models import Farm, CropRecommendationRecord

class FarmSerializer(serializers.ModelSerializer):
    class Meta:
        model = Farm
        fields = ['id', 'name', 'location', 'area_acres', 'soil_type', 'irrigation_source', 'created_at']

class CropRecommendationRecordSerializer(serializers.ModelSerializer):
    created_at_formatted = serializers.SerializerMethodField()

    class Meta:
        model = CropRecommendationRecord
        fields = [
            'id', 'farm', 'farm_name', 'nitrogen', 'phosphorus', 'potassium',
            'ph', 'temperature', 'humidity', 'rainfall',
            'recommended_crop', 'alternative_crops', 'confidence', 'reason',
            'created_at', 'created_at_formatted'
        ]

    def get_created_at_formatted(self, obj):
        return obj.created_at.strftime('%d %B %Y, %I:%M %p')
