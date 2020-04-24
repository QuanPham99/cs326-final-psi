'use-strict';

import { CustomerDB } from "./customerdb";
import { MyServer } from "./server";

const theDatabase = new CustomerDB('QuanPham99');
const theServer = new MyServer(theDatabase);

theServer.listen(process.env.PORT);
