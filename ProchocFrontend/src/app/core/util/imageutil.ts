import { ConnectorService } from "../service/connector.service";

export class ImageUtil {
    public resolve(name: string): string {
        return ConnectorService.API_URL + "getImage?name=" + name;
    }
}