package memory_sharing_server;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

public class Server {
    public static final int DEFAULT_PORT = 4455;
    private String ip;
    private int port;
    private String id;

    public Server(String id){
        ip = "localhost";
        port = DEFAULT_PORT;
        this.id = id;
    }
    public Server(String ip, int port,String id){
        this.ip = ip;
        this.port = port;
        this.id = id;
    }

    public Server(String ip,String id){
        this.ip = ip;
        this.port = DEFAULT_PORT;
        this.id = id;
    }

    public void start() throws IOException {
        ServerSocket server = new ServerSocket(port);
        Socket client = null;
        while(true){
            client = server.accept();
            System.out.println("New Connection!");
            new Thread(new ServerThread(client,ip,port,id)).start();
        }
    }


}
