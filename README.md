
### <p align="center"><img width="150px"  height="150px"  src="https://cdn-icons-png.flaticon.com/512/2540/2540167.png"></p>

  

# TransducerWeb

  

Software for communication with [our ](https://tilkom.com/)sensors.


### How to launch

  

#### `Step 1` - clone the repo

  

```bash

$ git clone https://github.com/EvgeniySlabko/TransducerWeb.git

```

  

#### `Step 2` - install dependencies

  

```bash

$ npm install

```

  

#### `Step 3` - run application

  

```bash

$ npm start

```
  

In browser, open [http://localhost:3000](http://localhost:8080/)


For building application use
```bash

$ npm run build

```
This script builds application with service worker and manifest. Service worker in develop mode may lead to loop updation browser page and may complicate development.

For testing finaly application with service worker and manifest use
```bash

$ npm run startProd

```
Do not forget clear cookie after that.
