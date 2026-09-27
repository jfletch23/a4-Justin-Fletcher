## Baseball Prospects Database

You can view the webapp at this [link](https://a4-justin-fletcher.onrender.com)

I changed assignment two to use React instead of basic HTML / CSS / Javascript. I created a Form component and a Card component. The card component was used to display each player as a card. Having a card component vastly improved the development experience because my code looks a lot cleaner now. Instead of very messy DOM tree modification code in JS, I was able to just pass in my data as a prop and easily create a card for each player. The hooks I used were useState for storing my player data and a useEffect for doing a GET request on page load to first get the players from my express server. 