export abstract class Query<RESULT> {
  protected result!: RESULT;

  abstract label(): string;
}
