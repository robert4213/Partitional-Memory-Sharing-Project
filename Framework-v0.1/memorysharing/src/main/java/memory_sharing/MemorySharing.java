package memory_sharing;
public class MemorySharing{
    public static final int DEFAULT_PORT = 4466;
    private String ip;
    private int port;

    public MemorySharing(){
        ip = "localhost";
        port = DEFAULT_PORT;
    }

    public MemorySharing(String ip, int port){
        this.ip = ip;
        this.port = port;
    }

    public MemorySharing(String ip){
        this.ip = ip;
        this.port = DEFAULT_PORT;
    }

    public Request request(String request){
        Request req = new Request();
        req.request(request).sourceAddress(ip).sourcePort(port);
        return req;
    }

    public Request find(){
        return request("find");
    }

    public Request findNode(){ return request("findNode"); }

    public Request create(){
        return request("create");
    }

    public Request read(){
        return request("read");
    }

    public Request update(){
        return request("update");
    }

    public Request delete(){
        return request("delete");
    }

    public Request replicate(){
        return request("replicate");
    }

    public Request migrate(){
        return request("migrate");
    }



}