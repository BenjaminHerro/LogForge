import googlemaps, random, datetime
from datetime import datetime as dt
from syd_subs import syd_suburbs

origin = 'Caringbah, NSW'
destination = random.choice(syd_suburbs)
date_format = '%d/%m/%Y %H:%M'
start_date = dt.strptime('')
totalHours = 0

class Entry:
    def __init__(self, origin, start_date,odometer,api_key):
        self.origin = origin
        self.start_date = start_date
        self.odometer = odometer
        self.api_key = api_key
        self.gmaps = googlemaps.Client(key=self.api_key)
        self.date_format = '%d/%m/%Y %H:%M'

        self.row_data = self.get_data_set(self.origin,self.start_data,self.odometer)
        
    def get_data_set(self,origin,start,odometer):
        total_hours = 0
        row_data = []
        while total_hours <= 100:
            if origin != 'Caringbah, NSW':
                destination = 'Caringbah, NSW'
            else:
                destination = random.choice(syd_suburbs)
            
if __name__ == '__main__':
    api = 'AIzaSyAa0j9WxwkGaaqpXsbVXTibtn5dC-4yThE'
