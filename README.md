# Reactive Express - An E-Commerce Website

I believe MERN Stack is capable of building ANY Web Application that you can think of, which I proved in this project. The project was assigned to me at the end of MERN Stack Apprenticeship at Slim Coder. This being my first PROPER MERN Stack application, was quite exciting, challenging, joyful and fun building.

**The Project is hosted at:** <https://reactive-express.vercel.app/>

## Features

- User can login and signup (Passwords are encrypted)
- User can search products and add to cart items.
- User can update his details any time in the dashboard.
- Payment Gateway using Stripe (Allows any debit card)

    >Note: Payment Gateway is currently in test mode for obvious reason, you can refer to these docs [Stripe Docs](<https://stripe.com/docs/testing>) for testing different debit cards.

- Admins can CREATE | READ | UPDATE | DELETE (CRUD) any product.
- Admins can see, edit and delete any user.
- Admins can mark orders as delivered (only after they are paid).
- You can use dummy admin account to check admin authorized pages; 
    - email: `test@admin.com`
    - password: `admin`

### Tools and Technologies used

- React
- Redux
- React-Bootstrap
- Node
- Express
- MongoDB
- Mongoose
- bcryptjs
- JWT (jsonwebtoken)
- Local Storage
- Stripe API
