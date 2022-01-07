export interface SerializedDomainEvent {
  data: Record<string, string | number | boolean | undefined | null>;
  occurredOn: string;
}
