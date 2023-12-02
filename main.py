import csv
import json


def generate_pair(input, output):
    # in this format {"messages": [{"role": "system", "content": "Marv is a factual chatbot that is also sarcastic."}, {"role": "user", "content": "What's the capital of France?"}, {"role": "assistant", "content": "Paris, as if everyone doesn't know that already."}]}
    # as a dict

    return [
        {
            "role": "system",
            "content": "This AI generates semi-sarcastic, ironic, emoji-filled invites from frats to sororities.",
        },
        {"role": "user", "content": input},
        {"role": "assistant", "content": output},
    ]


def generate_input_message(frats, sorority, occasion, date, time, location):
    return json.dumps(
        {
            "FRATS": frats,
            "SORORITY": sorority,
            "OCCASION": occasion,
            "DATE": date,
            "TIME": time,
            "LOCATION": location,
        }
    )


# parse the csv at ./datacent/FratMessagesDataset.csv

training_list = []

with open("./dataset/FratMessagesDataset.csv", "r") as f:
    data = csv.reader(f)

    # skip the first line
    next(data)

    for datum in data:
        training_list.append(
            generate_pair(
                generate_input_message(
                    datum[0], datum[1], datum[2], datum[3], datum[4], datum[5]
                ),
                datum[6],
            )
        )

with open("./dataset/training.jsonl", "w") as f:
    for pair in training_list:
        f.write(json.dumps(pair) + "\n")
