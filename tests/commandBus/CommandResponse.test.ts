import t from 'tap';
import { CommandResponse } from '../../src/commandBus/types/CommandResponse';
import { DomainEvent } from '../../src/eventBus/types/DomainEvent';
import { SerializedDomainEvent } from '../../src/eventBus/types/SerializedDomainEvent';

t.mochaGlobals();

describe('Command Response', () => {
  describe('.withResult()', () => {
    it('sets the results only', () => {
      // GIVEN
      const expected = 'result';

      // WHEN
      const actual = CommandResponse.withResult<string>(expected);

      // THEN
      t.equal(actual.result, expected);
      t.equal(actual.events.length, 0);
    });
  });

  describe('.withEvents()', () => {
    it('sets the events only', () => {
      // GIVEN
      class DummyEvent implements DomainEvent {
        label = () => DummyEvent.name;
        occurredOn = () => new Date();
        serialize = (): SerializedDomainEvent => ({
          occurredOn: this.occurredOn().toISOString(),
          data: {}
        });
      }

      const expected = [new DummyEvent()];

      // WHEN
      const actual = CommandResponse.withEvents(expected);

      // THEN
      t.equal(actual.result, null);
      t.equal(actual.events, expected);
    });
  });

  describe('.with()', () => {
    it('sets the result and the events ', () => {
      // GIVEN
      class DummyEvent implements DomainEvent {
        label = () => DummyEvent.name;
        occurredOn = () => new Date();
        serialize = (): SerializedDomainEvent => ({
          occurredOn: this.occurredOn().toISOString(),
          data: {}
        });
      }

      const expectedResult = 'some-result';
      const expectedEvents = [new DummyEvent()];

      // WHEN
      const actual = CommandResponse.with(expectedResult, expectedEvents);

      // THEN
      t.equal(actual.result, expectedResult);
      t.equal(actual.events, expectedEvents);
    });
  });
});
