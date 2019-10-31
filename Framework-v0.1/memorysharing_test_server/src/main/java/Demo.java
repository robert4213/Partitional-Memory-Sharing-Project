import memory_sharing_server.Server;

import java.io.IOException;

public class Demo {
    public static void main(String[] args) throws IOException {
        Server server = new Server("localhost",4455,"Master1");

        // TODO connect to other nodes & settings

        server.start();
    }

}
