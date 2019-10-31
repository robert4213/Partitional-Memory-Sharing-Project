package memory_sharing_server;



import org.json.JSONArray;
import org.json.JSONObject;

import java.util.Date;


public class Response{
    JSONObject object;
    JSONArray dataArray;
    public Response(){
        dataArray = new JSONArray();
        object = new JSONObject();
    }

    public Response request(String request){
        object.put("request",request);
        return this;
    }

    public Response targetAddress(String address){
        object.put("targetAddress",address);
        return this;
    }

    public Response targetPort(int port){
        object.put("targetPort",port);
        return this;
    }

    public Response sourceId(String id){
        object.put("sourceId", id);
        return this;
    }

    public Response sourceAddress(String address){
        object.put("sourceAddress", address);
        return this;
    }

    public Response sourcePort(int port){
        object.put("sourcePort", port);
        return this;
    }

    public Response status(int status){
        object.put("status", status);
        return this;
    }

    public Response data(DataJson dataJson){
        dataArray.put(dataJson.getData());
        return this;
    }

    public JSONObject send(){
        object.put("date", new Date().toString());
        object.put("data",dataArray);
        //Send Response to user
        return object;
    }

    public JSONObject getBody(){
        return object;
    }
}