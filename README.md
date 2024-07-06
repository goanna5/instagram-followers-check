# Overview

A really basic script that I initially wrote in python to find out who's not following me back on instagram. Decided to make this into a web interface (and translate it to JS) for ease of use.

# To do 
- Styling 💀 (rn its boilerplate html, no css at all)

# Tech stack
HTML, JS

# My original Python code
```Python
import json

my_followers = []
not_following_me = []

followers = open("followers.json", "r")
follower_data = json.load(followers)

for cluster in follower_data:
    for key, value in cluster.items():
        if key == 'string_list_data':
            data_dict = value[0]
            for nkey, nval in data_dict.items():
                if nkey == 'value':
                    my_followers.append(nval)

following = open("following.json", "r")
following_data = json.load(following)

for cluster in following_data['relationships_following']:
    for key, value in cluster.items():
        if key == 'string_list_data':
            data_dict = value[0]
            for nkey, nval in data_dict.items():
                if nkey == 'value' and nval not in my_followers:
                    not_following_me.append(nval)

print(f"Here's who's not following you back! ({len(not_following_me)} people sorted alphabetically)")
for person in sorted(not_following_me):
    print(person)
```