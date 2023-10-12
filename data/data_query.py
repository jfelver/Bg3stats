import json
from tkinter import *
import tkinter.ttk as ttk
import logging

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

# create a file handler
handler = logging.FileHandler('data_query.log')
handler.setLevel(logging.INFO)

# create a logging format
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)

# add the handlers to the logger
logger.addHandler(handler)

class SetEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, set):
            return list(obj)
        return json.JSONEncoder.default(self, obj)

def getFields():
    fields = set()
    f = open('json_output.json')
    data = json.load(f)

    for entry in data:
        for k,v in entry.items():
            fields.add(k)
    fields = list(fields)
    fields.sort()

    logger.info("Fields: %s", fields)

    return fields

def printField(event):
    print(event.widget.get())

def main():

    results = set()
    fields = getFields()

    root = Tk()
    root.geometry('500x250')
    logger.info("Creating tkinter window...")
    ttk.Label(root, text = "Select the Field :", 
              font = ("Times New Roman", 10)).grid(column = 0, 
              row = 0, padx = 10, pady = 25) 

    logger.info("Creating field combobox...")
    fieldsComboBox = ttk.Combobox(values=list(fields))
    fieldsComboBox.grid(column=1, row=0)
    fieldsComboBox.bind('<<ComboboxSelected>>', printField)

    root.mainloop()

if __name__ == "__main__":
    main()