'use-strict';

import { MyServer } from "./server";
import {AssistantDB} from "./assistantdb";

const theDatabase = new AssistantDB('QuanPham99');
const theServer = new MyServer(theDatabase);

theServer.listen(8080);
