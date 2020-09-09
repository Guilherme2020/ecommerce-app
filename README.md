<p align="center"> Ecommerce app is an application developed in react-native and using async storage to save user purchases in the application's storage
</p>

- ⚛️ **React Native** —  Mobile framework that provides an efficient way to create native applications for Android and iOS.
    - Use of ⚛️ React Hooks.
    - Use of ⚛️ Context Api.
    - Use of axios for communication with api.
    - Use of the styled-coponents library.
    - Use of the react-navigation library for navigation between screens.
    - Use of the react-native-ratings;
    - Use of the react-native-vector-icons.
    - Use of the intl for format currency.
    - Use react-native-async-storage for save infos cart user in storage app.
    - Use json-server for mock api rest.
### Mobile:
Run the lines below to launch the application on your physical device or emulator.

    - yarn install.
    - npx react-native start
    - npx react-native run-android
    - To run fake api using json server inside the project run the command yarn json-server server.json -p 3333.
    - After opening the emulator use the command on the adb reverse terminal tcp: 3333 tcp: 3333. So the emulator will identify the host that is running the api.
    - As soon as the process is finished, the application will run on the device that was installed.

    - (if there is an error in the terminal referring to the project libraries, correct by synchronizing the project in android studio).
## Features:

 - Product Listing Screen
   - You will be able to see the products in the store.
   - Buy button (redirects to the shopping cart).
   - Add to Shopping Cart button.
   - If you already have it in your shopping cart, you will have the remove button
   cart.
   - There will be a filter by product name
   - There will be ordering by price
   - There will be pagination of the products (user will see a maximum of 10 products in
   each page)
   - When selecting a product the user will go to the Product details screen
 - DetailOrder
   - Other product pictures
   - Product's name
   - Product description
   - Price of the product
   - Discount (if any)
   - Average ratings from those who consumed
   - Buy button (redirects to the shopping cart)
   - Add to Cart button
   - If you already have it in your shopping cart, you will have the remove button
    cart
   - You will see comments about that product from other users
 -  Shopping Cart Screen
  - The user will see all items added to the shopping cart
  - Each item will have
  - Main product image
  - Product's name
  - Price of the product
  - Discount
  - Average ratings from those who consumed saw.
  - Button to remove from cart
  - There will be a sum of the total to pay in the footer (considering the
  discounts for each product)

<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img src="screenshots/home.png" alt="Home App">
  </a>
</p>
<br/>
<br/>

<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img src="screenshots/filtroimage.png" alt="Home App">
  </a>
</p>
<br/>
<br/>

<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img src="screenshots/result-filter.png" alt="Home App">
  </a>
</p>
<br/>
<br/>

<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img src="screenshots/filterPrice.png" alt="Home App">
  </a>
</p>
<br/>
<br/>

<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img src="screenshots/resultMorePrice.png" alt="Home App">
  </a>
</p>
<br/>
<br/>

<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img src="screenshots/mac.png" alt="Home App">
  </a>
</p>
<br/>
<br/>

<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img src="screenshots/detailItem.png" alt="Home App">
  </a>
</p>
<br/>
<br/>

<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img src="screenshots/detailItem_2.png" alt="Home App">
  </a>
</p>
<br/>
<br/>

<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img src="screenshots/cart.png" alt="Home App">
  </a>
</p>
<br/>

<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img src="screenshots/cart_2.png" alt="Home App">
  </a>
</p>
<br/>

<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img src="screenshots/cart_3.png" alt="Home App">
  </a>
</p>
<br/>




## Licence

This project is licensed under the MIT License - See the [license](https://opensource.org/licenses/MIT) for details.
