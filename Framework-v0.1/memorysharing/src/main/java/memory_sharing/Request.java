package memory_sharing;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.*;
import java.net.Socket;
import java.net.SocketTimeoutException;
import java.util.Date;

public class Request {
    JSONObject object;
    JSONArray dataArray;
    public Request(){
        dataArray = new JSONArray();
        object = new JSONObject();
    }

    public Request request(String request){
        object.put("request",request);
        return this;
    }

    public Request targetAddress(String address){
        object.put("targetAddress",address);
        return this;
    }

    public Request targetPort(int port){
        object.put("targetPort",port);
        return this;
    }

    public Request targetId(String id){
        object.put("targetId", id);
        return this;
    }

    public Request sourceAddress(String address){
        object.put("sourceAddress", address);
        return this;
    }

    public Request sourcePort(int port){
        object.put("sourcePort", port);
        return this;
    }

    public Request data(DataJson dataJson){
        dataArray.put(dataJson.getData());
        return this;
    }

    public JSONObject send(){
        Date date= new Date();
        object.put("date", date.toString());
        object.put("data",dataArray);
        System.out.println(object.toString(4));

        try {
            Socket client = new Socket(object.getString("targetAddress"), object.getInt("targetPort"));
            client.setSoTimeout(10000);
            PrintStream out = new PrintStream(client.getOutputStream());
            BufferedReader buf =  new BufferedReader(new InputStreamReader(client.getInputStream()));
            out.println(object.toString());
            try{
                String echo = buf.readLine();
                JSONObject response = new JSONObject(echo);
                System.out.println("Response Get");
                System.out.println(response.toString(4)+"\n");
                return response;
            }catch(SocketTimeoutException e){
                System.out.println("Time out, No response");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public JSONObject getBody(){
        return object;
    }
}
