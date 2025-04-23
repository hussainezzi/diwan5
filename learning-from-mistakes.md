for got to do
  1had not made a temp user in the database which can be used by fronend to upload the data , as no authenitcation is applied till now 
  2make the custom typeof poem as it is needed in the list card
  3make the client.ts file , prisma/client is a module , and PrismaCLient is the class which provides us facility to fetch and create in the database , i forgot to make a file of it and import that in the api section 


  md is the markdown extention
  

  for prisma generate , we need to add this script in the pacakge.json "prisma": {
    "schema": "prisma/schema.prisma"
  },
   this will tell prisma generate from where i have to get the schema in order to make the types

   for the production process the predev and postdev commands are super importatnt , they are important also for the as if we sometimes forget the prisma generate command we can stick it with every build command
   
   "postinstall": "yarn prisma generate"

