# Projects

This app seeks to illustrate how an evolutionary algorithm works. This project has two parts, the REST API in Python/Flask, and the Front-End in Reactjs.

This is how the Python/Flask back-end works:

## The API gest a call from a PUT petition:
<img src="/jsonPost.PNG" width=1000>

## And answers with a JSON object:
<img src="/jsonPostresponse.PNG" width=1000>

This is how the Reactjs Front-end works:

## The app generates a random example:
<img src="/appblank.PNG" width=1000>

## The first option is without constraints (you can take them all!):
<img src="/takeall.PNG" width=1000>

## The second option you can only take half the items (try to get the most valuable ones!):
<img src="/takehalf.PNG" width=1000>

## The third option you can only take 100 in value (or the closest):
<img src="/take100value.PNG" width=1000>

The algorithm is trying to choose based on how well the answer fits in the constraint. It keeps changing until it gets as close as possible! (but sometimes it gets lost, but you can try again, maybe a second time you get better luck!)
