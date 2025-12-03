## **Project Features**

### **Core Functionality**

* Predicts the current gear of a vehicle using machine learning.
* Utilizes real-time driving parameters such as speed, RPM, throttle position, and engine load.
* Implements a multi-class classification approach for gear detection.
* Developed using Python and Scikit-Learn.

### **Data & Simulation**

* Uses synthetic data generated with realistic vehicle physics to simulate driving behavior.
* Each gear has a unique speed–RPM pattern, allowing the model to learn clear relationships.
* Input features used in the model:

  * `speed_kmh` – vehicle speed
  * `rpm` – engine revolutions per minute
  * `throttle_pct` – throttle pedal input
  * `engine_load` – engine load percentage

### **Machine Learning Model**

* Built using a Random Forest Classifier.
* Achieves a prediction accuracy of 98.2%.
* Trained on thousands of synthetic driving samples.
* Learns non-linear and complex relationships between vehicle parameters.

### **Use Cases**

* Analysis of driving behavior and efficiency.
* Simulation and game development for realistic gear-shifting AI.
* Automotive research where direct transmission data is not available.
* Educational demonstration of machine learning classification techniques.

### **Future Improvements**

* Collecting real-world vehicle data via OBD-II for validation.
* Adding incline/decline (slope) data for more realistic modeling.
* Integration into a simple driving or racing simulation.
* Testing alternative ML models such as XGBoost or neural networks.

### **Project Scope**

* Designed for educational and experimental use.
* Not intended as a professional automotive tool.
* Lightweight, understandable, and suitable for beginner machine learning projects.
