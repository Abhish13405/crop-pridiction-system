from django.urls import path
from .views import (
    DashboardSummaryView, 
    FarmListCreateView, 
    HealthCheckView,
    CropRecommendationView,
    PlantDiseaseDetectionView,
    HistoryListView,
    SoilHealthInterpretView,
    FarmerLoginView,
    FarmerLogoutView,
    FarmerStatusView,
    MandiRatesView
)

urlpatterns = [
    path('health/', HealthCheckView.as_view(), name='health_check'),
    path('auth/login/', FarmerLoginView.as_view(), name='farmer_login'),
    path('auth/logout/', FarmerLogoutView.as_view(), name='farmer_logout'),
    path('auth/user/', FarmerStatusView.as_view(), name='farmer_status'),
    path('dashboard/', DashboardSummaryView.as_view(), name='dashboard_summary'),
    path('farms/', FarmListCreateView.as_view(), name='farm_list_create'),
    path('recommend-crop/', CropRecommendationView.as_view(), name='recommend_crop'),
    path('predict-image/', PlantDiseaseDetectionView.as_view(), name='predict_image'),
    path('history/', HistoryListView.as_view(), name='history_list'),
    path('soil-health/', SoilHealthInterpretView.as_view(), name='soil_health_interpret'),
    path('mandi-rates/', MandiRatesView.as_view(), name='mandi_rates'),
]


