import memory_sharing.DataJson;
import memory_sharing.MemorySharing;
import memory_sharing.Request;
import org.json.JSONObject;

public class Demo{
        public static void main(String Args[]){
            // Initialize
            MemorySharing memorySharing = new MemorySharing("localhost",4466);


            // Data Manipulation
            Request[] requests = new Request[8];
            JSONObject[] response = new JSONObject[8];

            // Create new data
            DataJson data0 = new DataJson();
            DataJson data1 = new DataJson();

            data0.setName("sample0").setType("String").setObj("Data0");
            data1.setName("sample1").setType("String").setObj("Data1");

            requests[0] = memorySharing.create()
                    .targetAddress("localhost")
                    .targetPort(4455)
                    .data(data0)
                    .data(data1);
            System.out.println("New Request: " + requests[0].getBody().getString("request"));
            response[0] = requests[0].send();

            // Update data
            data1.setType("String").setObj("Data10");
            requests[1] = memorySharing.update()
                    .targetAddress("localhost")
                    .targetPort(4455)
                    .data(data1);
            System.out.println("New Request: " + requests[1].getBody().getString("request"));
            response[1] = requests[1].send();

            // Read data
            DataJson data2 = new DataJson();
            data2.setName("sample2");
            requests[2] = memorySharing.read()
                    .targetAddress("localhost")
                    .targetPort(4455)
                    .data(data2);
            System.out.println("New Request: " + requests[2].getBody().getString("request"));
            response[2] = requests[2].send();

            // Delete data
            DataJson data3 = new DataJson();
            data3.setName("sample3");
            requests[3] = memorySharing.delete()
                    .targetAddress("localhost")
                    .targetPort(4455)
                    .data(data3);
            System.out.println("New Request: " + requests[3].getBody().getString("request"));
            response[3] = requests[3].send();

            // Find data
            DataJson data4 = new DataJson();
            data4.setName("sample4");
            requests[4] = memorySharing.find()
                    .targetAddress("localhost")
                    .targetPort(4455)
                    .data(data4);
            System.out.println("New Request: " + requests[4].getBody().getString("request"));
            response[4] = requests[4].send();

            // Find node
            //All nodes should response this request
            requests[5] = memorySharing.findNode()
                    .targetAddress("localhost")
                    .targetPort(4455);
            System.out.println("New Request: " + requests[5].getBody().getString("request"));
            response[5] = requests[5].send();

            // Replicate data
            // Target node is the destination where data migrates to
            DataJson data6 = new DataJson();
            data6.setName("sample6");
            requests[6] = memorySharing.replicate()
                    .targetAddress("localhost")
                    .targetPort(4455)
                    .data(data6);
            System.out.println("New Request: " + requests[6].getBody().getString("request"));
            response[6] = requests[6].send();

            // Replicate Data
            // Target node is the destination where data replicates to
            DataJson data7 = new DataJson();
            data7.setName("sample7");
            requests[7] = memorySharing.migrate()
                    .targetAddress("localhost")
                    .targetPort(4455)
                    .data(data7);
            System.out.println("New Request: " + requests[7].getBody().getString("request"));
            response[7] = requests[7].send();
        }
    }

