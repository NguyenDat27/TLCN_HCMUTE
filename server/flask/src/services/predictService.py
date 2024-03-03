import numpy as np
import os
import shutil
import tensorflow as tf

class predictService:
    def __init__(self, url, model):
        """
        Create a new predict service.

        Args:
            url: The image URL.
        """
        self.imageURL = url
        self.result = None
        self.models = model
        
    def predict(self):
        """
        predict.

        Returns:
            The result.
        """
        image = self.preprocessImage()
        predictions = self.models.weightModel.predict(image)
        predicted_class = np.argmax(predictions)
        # print(predicted_class)
        if predicted_class in self.models.labels:
            self.result = self.models.labels[predicted_class]
        else:
            self.result = "Not in desease list!!!"
        return self.result
    
    def preprocessImage(self):
        cache_subdir = os.path.join(os.getcwd(), "caches/")
        image = tf.keras.preprocessing.image.load_img(tf.keras.utils.get_file(origin=self.imageURL, cache_subdir=cache_subdir), target_size=(200, 200), color_mode = "grayscale")
        image_array = tf.keras.preprocessing.image.img_to_array(image)
        image_array = np.expand_dims(image_array, axis=0)
        image_array = image_array / 255.0
        shutil.rmtree(cache_subdir)
        # print(image_array)
        return image_array