package memory_sharing_server;

import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.net.Socket;

public class ServerThread implements Runnable {
    private Socket client;
    private String ip;
    private int port;
    private String id;
    public ServerThread(Socket client,String ip,int port,String id){
        this.client = client;
        this.ip = ip;
        this.port = port;
        this.id = id;
    }

    @Override
    public void run() {
        try{
            PrintStream out = new PrintStream(client.getOutputStream());
            BufferedReader buf = new BufferedReader(new InputStreamReader(client.getInputStream()));

            String str =  buf.readLine();
            JSONObject obj = new JSONObject(str);
            System.out.print(obj.toString(4));
            JSONObject response;
            switch (obj.getString("request")){
                case "create":
                    response=create(obj);
                    break;
                case "update":
                    response=update(obj);
                    break;
                case "read":
                    response=read(obj);
                    break;
                case "delete":
                    response=delete(obj);
                    break;
                case "find":
                    response=find(obj);
                    break;
                case "findNode":
                    response=findNode(obj);
                    break;
                case "replicate":
                    response=replicate(obj);
                    break;
                case "migrate":
                    response=migrate(obj);
                    break;
                default:
                    Response res = new Response();
                    response = res.request(obj.getString("request"))
                            .sourceAddress(ip)
                            .sourcePort(port)
                            .sourceId(id)
                            .targetAddress(obj.getString("sourceAddress"))
                            .targetPort(obj.getInt("sourcePort"))
                            .status(500)
                            .send();
            }

            out.println(response.toString());
            out.close();
            client.close();
        }catch(Exception e){
            e.printStackTrace();
        }
    }

    private JSONObject create(JSONObject obj){
        return new Response().request(obj.getString("request"))
                .sourceAddress(ip)
                .sourcePort(port)
                .sourceId(id)
                .targetAddress(obj.getString("sourceAddress"))
                .targetPort(obj.getInt("sourcePort"))
                .status(200)
                .send();
    }

    private JSONObject update(JSONObject obj){
        return new Response().request(obj.getString("request"))
                .sourceAddress(ip)
                .sourcePort(port)
                .sourceId(id)
                .targetAddress(obj.getString("sourceAddress"))
                .targetPort(obj.getInt("sourcePort"))
                .status(200)
                .send();
    }

    private JSONObject read(JSONObject obj){
        DataJson data1 = new DataJson();
        DataJson data2 = new DataJson();
        DataJson data3 = new DataJson();
        data1.setId("d1").setName("sample2").setNextId("d2").setType("String").setObj("d1");
        data2.setId("d2").setName("sample2").setHeadId("d1").setNextId("d3").setType("String").setObj("d2");
        data3.setId("d3").setName("sample2").setHeadId("d1").setType("String").setObj("d3");
        return new Response().request(obj.getString("request"))
                .sourceAddress(ip)
                .sourcePort(port)
                .sourceId(id)
                .targetAddress(obj.getString("sourceAddress"))
                .targetPort(obj.getInt("sourcePort"))
                .status(200)
                .data(data1)
                .data(data2)
                .data(data3)
                .send();
    }

    private JSONObject delete(JSONObject obj){
        return new Response().request(obj.getString("request"))
                .sourceAddress(ip)
                .sourcePort(port)
                .sourceId(id)
                .targetAddress(obj.getString("sourceAddress"))
                .targetPort(obj.getInt("sourcePort"))
                .status(200)
                .send();
    }

    private JSONObject find(JSONObject obj){
        DataJson data1 = new DataJson();
        DataJson data2 = new DataJson();
        DataJson data3 = new DataJson();
        DataJson data4 = new DataJson();
        data1.setId("e1").setName("sample4").setNextId("e2").setType("String");
        data2.setId("e2").setName("sample4").setHeadId("e1").setNextId("e3").setType("String");
        data3.setId("e3").setName("sample4").setHeadId("e1").setNextId("e4").setType("String");
        data4.setId("e4").setName("sample4").setHeadId("e1").setType("String");
        return new Response().request(obj.getString("request"))
                .sourceAddress(ip)
                .sourcePort(port)
                .sourceId(id)
                .targetAddress(obj.getString("sourceAddress"))
                .targetPort(obj.getInt("sourcePort"))
                .status(200)
                .data(data1)
                .data(data2)
                .data(data3)
                .data(data4)
                .send();
    }

    private JSONObject findNode(JSONObject obj){
        return new Response().request(obj.getString("request"))
                .sourceAddress(ip)
                .sourcePort(port)
                .sourceId(id)
                .targetAddress(obj.getString("sourceAddress"))
                .targetPort(obj.getInt("sourcePort"))
                .status(200)
                .send();

    }

    private JSONObject replicate(JSONObject obj){
        return new Response().request(obj.getString("request"))
                .sourceAddress(ip)
                .sourcePort(port)
                .sourceId(id)
                .targetAddress(obj.getString("sourceAddress"))
                .targetPort(obj.getInt("sourcePort"))
                .status(200)
                .send();
    }

    private JSONObject migrate(JSONObject obj){
        return new Response().request(obj.getString("request"))
                .sourceAddress(ip)
                .sourcePort(port)
                .sourceId(id)
                .targetAddress(obj.getString("sourceAddress"))
                .targetPort(obj.getInt("sourcePort"))
                .status(200)
                .send();
    }

}
