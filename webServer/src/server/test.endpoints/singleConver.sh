#!/bin/bash


# single
#http GET "http://localhost:8080/newConversation/this is keihan"



# batch                          (THE)
#  POST "http://localhost:8080/newConverBatch/$1"
# http
# http




#curl -d '{"reqType":"batch","context":[{"id":1,"promptValue":"hi doctor i have headache ask me 3 questions in order to diagnose me "},{"id":2,"promptValue":"what can i do for that to be better"},{"id":3,"promptValue":"im hungery"}]}' -H "Content-Type: application/json" -X POST http://localhost:8080/newConverBatch

curl -d '{"reqType":"batch","context":[{"id":1,"cat":"gen" , "promptValue":"hi whatsapp"}]}' -H "Content-Type: application/json" -X POST http://localhost:8080/newConverBatch




