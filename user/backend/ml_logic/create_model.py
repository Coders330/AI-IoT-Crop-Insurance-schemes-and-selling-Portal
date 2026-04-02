import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib
import numpy as np

# Create synthetic data representing: Soil Moisture, Soil Temp, Humidity, Air Temp
# Logic: High moisture/moderate temp = Healthy (0), Low moisture/High temp = Unhealthy (2)
X = np.array([
    [30, 25, 60, 28], [10, 40, 30, 35], [20, 30, 45, 30], # Training samples
    [35, 22, 65, 25], [5, 45, 20, 40], [15, 35, 40, 32]
])
y = np.array([0, 2, 1, 0, 2, 1]) # 0:Healthy, 1:Fair, 2:Unhealthy

model = RandomForestClassifier()
model.fit(X, y)

# Save the model that Node.js will actually use
joblib.dump(model, 'sensor_model.pkl')
print("New Sensor Model Saved!")