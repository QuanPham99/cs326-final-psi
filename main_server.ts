'use-strict';

import { CustomerDB } from "./Database/mongo-database";
import { MyServer } from "./server";
<<<<<<< HEAD:server/main_server.ts
import {AssistantDB} from "./assistantdb";

const theDatabase = new AssistantDB('QuanPham99');
=======

const theDatabase = new CustomerDB('QuanPham99');
>>>>>>> 6bfb9adcb9cc6743b7ff537cbfa86beb7672f911:main_server.ts
const theServer = new MyServer(theDatabase);

theServer.listen(8080);
