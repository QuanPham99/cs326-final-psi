'use-strict';

import { CustomerDB } from "./Database/customerdb";
import { AssistantDB} from "./Database/assistantdb";
import { MyServer } from "./server";

const customerDatabase = new CustomerDB('QuanPham99');
const assistantDatabase = new AssistantDB('QuanPham99')
const theServer = new MyServer(customerDatabase, assistantDatabase);

theServer.listen(8080);
