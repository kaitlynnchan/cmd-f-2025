def calculate_carbon_footprint(requests):
    """
    Calculate the total carbon footprint based on the number of requests.
    Assume a fixed carbon footprint per request (e.g., 0.2 grams CO2 per request).
    """
    carbon_footprint_per_request = 4.32  # grams CO2
    total_carbon_footprint = requests * carbon_footprint_per_request
    return total_carbon_footprint

# def get_carbon_footprint_meaning(carbon_footprint):
#     """
#     Provide a relative meaning of the carbon footprint.
#     """
#     if carbon_footprint < 100:
#         return "The carbon footprint is relatively low. It's equivalent to the CO2 emissions of driving a car for a few kilometers."
#     elif carbon_footprint < 1000:
#         return "The carbon footprint is moderate. It's equivalent to the CO2 emissions of driving a car for tens of kilometers."
#     else:
#         return "The carbon footprint is high. It's equivalent to the CO2 emissions of driving a car for hundreds of kilometers."
