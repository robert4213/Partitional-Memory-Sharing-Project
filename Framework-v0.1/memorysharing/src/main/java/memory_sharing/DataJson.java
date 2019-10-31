package memory_sharing;


import org.json.JSONObject;

public class DataJson {
    JSONObject data;
    public DataJson(){
        data = new JSONObject();
        data.put("id","");
        data.put("name","");
        data.put("head_id","");
        data.put("next_id","");
        data.put("type","");
        data.put("obj","");
    }

    public DataJson setId(String id){
        data.put("id",id);
        if(data.getString("head_id") == ""){
            data.put("head_id",id);
        }
        return this;
    }

    public DataJson setName(String name){
        data.put("name",name);
        return this;
    }

    public DataJson setHeadId(String head_id){
        data.put("head_id",head_id);
        return this;
    }

    public DataJson setNextId(String next_id){
        data.put("next_id",next_id);
        return this;
    }

    public DataJson setType(String type){
        data.put("type",type);
        return this;
    }

    public DataJson setObj(Object obj) {
        data.put("obj", obj);
        return this;
    }

    public JSONObject getData(){
        return data;
    }
}
