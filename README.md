# nmipayment
Payment gateway integration


# CURL URL API TESTING

<!-- MAKE ORDER -->
curl --location 'localhost:7000/api/v1/order' \
--header 'authkey: PAYMENT' \
--header 'Content-Type: application/json' \
--data-raw '{
    "amount": 100.00,
    "cardnumber": "5411111111111115",
    "card_expire": "1025", 
    "cvv": "541",
    "type": "sale",
    "firstname": "Test",
    "lastname": "User",
    "address1": "123 Main St",
        "address2": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipcode": "12345",
    "country": "India",
    "email": "Test@gmail.com",
    "contact": "7389334851",
    "description": "Los Angeles"
}'


# GET ORDER 

curl --location --request POST 'localhost:7000/api/v1/orderHistory' \
--header 'authkey: PAYMENT' \
--data ''