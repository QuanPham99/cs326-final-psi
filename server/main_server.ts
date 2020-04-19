'use-strict';

import { MyServer } from "./server";
import { Database} from "./assistance";

const theDatabase = new Database('QuanPham99');
const theServer = new MyServer(theDatabase);

theServer.listen(8080);
