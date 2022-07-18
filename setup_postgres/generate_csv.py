import csv
from random import randint

with open('fuel.csv', 'w') as file:
    writer = csv.writer(file)
    writer.writerow(["fuel_id", "highway_mpg", "city_mpg", "fuel_type"])
    fuel_types = ["hybrid", "gas", "electric"]
    for i in range(0, 25):
        writer.writerow([i, int(randint(25, 38)), int(randint(22, 35)),  fuel_types[randint(0, len(fuel_types)-1)]])


with open('engine.csv', 'w') as file:
    writer = csv.writer(file)
    writer.writerow(["engine_id", "engine_loc", "engine_size", "horsepower", "cylinders"])
    cylinders = [4, 6, 8]
    sizes = [1.5, 2, 2.5]
    for i in range(0, 25):
        writer.writerow([i, "front", sizes[randint(0, 2)], randint(181, 481), cylinders[randint(0, 2)]])

with open('body.csv', 'w') as file:
    writer = csv.writer(file)
    writer.writerow(["body_id", "body_style", "seats", "doors", "drive_wheel"])
    styles = ["sedan", "hatchback", "suv"]
    seats = [2, 4, 7, 8]
    doors = [2, 4]
    drive_wheel = ["fwd", "rwd", "awd"]
    for i in range(0, 25):
        writer.writerow([i, styles[randint(0, 2)], seats[randint(0, 3)], doors[randint(0, 1)], drive_wheel[randint(0, len(drive_wheel)-1)]])

with open('car.csv', 'w') as file:
    writer = csv.writer(file)
    writer.writerow(["car_id", "make", "model", "safety_rating", "price", "parent_company", "image_url", "website"])
    makes = ["Ford", "GMC", "Genesis", "Honda", "Hyundai", "Infiniti", "Kia", "Jaguar", "Jeep", "Lexus"]
    makeModelMap = {
        "Ford" : ["Escape", "Mustang", "Fusion"],
        "GMC": ["Terrian"],
        "Honda": ["Civic", "Accord", "CR-V", "Fit"],
        "Hyundai": ["Elantra HEV", "Sonnata", "tuscon"],
        "Jaguar": ["XE"],
        "Jeep": ["Wrangler", "Cherokee", "Compass"],
        "Kia": ["Soul", "Sorento", "K5"],
        "Lexus": ["ES", "RX"],
        "Infiniti": ["QX55"],
        "Genesis": ["G70"],
    }

    makeParentMap = {
        "Ford": "Ford Motor Co.",
        "GMC": "General Motors",
        "Genesis": "Hyundai Motor Group",
        "Honda": "Honda Motor Co.",
        "Hyundai": "Hyundai Motor Group",
        "Jeep": "Stellantis",
        "Jaguar": "Tata Motors",
        "Kia": "Hyundai Motor Group",
        "Lexus": "Toyota Motor Group",
        "Infiniti": "Renault-Nissan-Mitsubishi Alliance",
    }

    i = 0
    for make in makes:
        for model in makeModelMap[make]:
            writer.writerow([i, make, model, randint(4, 5), randint(20000, 40000), makeParentMap[make], "image_url", "website_url"])
            i += 1