import { ApiClusterUpsertRequest } from "../model/api-cluster.model";
import { ApiRouteUpsertRequest } from "../model/api-route.model";

export class ApiGatewayMapping{
    public static toClusterUpsertRequest(rawValue: any): ApiClusterUpsertRequest {
        return {
            clusterId: rawValue.clusterId,
            loadBalancingPolicy: rawValue.loadBalancingPolicy,
            healthCheckEnabled: rawValue.healthCheckEnabled?? false,
            healthCheckPath: rawValue.healthCheckPath?? '',
            healthCheckInterval: rawValue.healthCheckInterval?? 0,
            healthCheckTimeout: rawValue.healthCheckTimeout?? 0,
            destinations: rawValue.destinations.map(destination => ({
                destinationId: destination.destinationId,
                address: destination.address,
                isActive: destination.isActive,
            })),
        };
    }

    public static toRouteUpsertRequest(rawValue: any): ApiRouteUpsertRequest {
        return {
          routeId: rawValue.routeId,
          path: rawValue.path,
          methods: rawValue.methods,
          isActive: rawValue.isActive?? false,
          rateLimiterPolicy: rawValue.rateLimiterPolicy,
          clusterId: rawValue.clusterId,
          headers: (rawValue.headers || []).map((header: { name: string; values: string; mode: string; isActive: boolean }) => ({
            name: header.name,
            values: (header.values || '')
              .split(',')
              .map((v: string) => v.trim())
              .filter(Boolean),
            mode: header.mode,
            isActive: header.isActive?? false,
          })),
          transforms: (rawValue.transforms || []).map((transform: { pathPattern: string; isActive: boolean }) => ({
            pathPattern: transform.pathPattern,
            isActive: transform.isActive?? false,
          })),
        };
    }
}