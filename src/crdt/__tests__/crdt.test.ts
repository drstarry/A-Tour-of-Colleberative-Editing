import { describe, beforeEach, it, expect } from 'vitest';
import { Text, Content, Chr, Insert, Delete } from '../index';

describe('My CRDT Test', () => {
  describe('Text object: Insert & Delete', () => {
    let textA: Text;
    let textB: Text;

    beforeEach(() => {
      textA = new Text();
      textB = new Text();
    });

    it('insert inside replica', () => {
      textA.add(0, new Chr(0, 'D', 0));
      expect(textA.len()).toBe(1);
      expect(textA.toString()).toBe('D');

      textA.add(1, new Chr(0, 'i', 1));
      expect(textA.len()).toBe(2);
      expect(textA.toString()).toBe('Di');

      textA.add(2, new Chr(0, 's', 2));
      expect(textA.len()).toBe(3);
      expect(textA.toString()).toBe('Dis');
    });

    it('delete inside replica', () => {
      textA.add(0, new Chr(0, 'D', 0));
      textA.add(1, new Chr(0, 'i', 1));
      textA.add(2, new Chr(0, 's', 2));
      expect(textA.toString()).toBe('Dis');

      textA.remove(0);
      expect(textA.len()).toBe(2);
      expect(textA.toString()).toBe('is');

      textA.remove(1);
      expect(textA.len()).toBe(1);
      expect(textA.toString()).toBe('i');

      textA.add(0, new Chr(0, 'D', 3));
      expect(textA.len()).toBe(2);
      expect(textA.toString()).toBe('Di');

      textA.add(1, new Chr(0, 'i', 4));
      textA.add(2, new Chr(0, 's', 5));
      expect(textA.toString()).toBe('Disi');
    });

    it('insert inter replicas', () => {
      textA.add(0, new Chr(0, 'D', 0));
      textA.add(1, new Chr(0, 'o', 1));
      textA.add(2, new Chr(0, 'S', 2));
      textB.add(0, new Chr(0, 'D', 0));
      textB.add(1, new Chr(0, 'o', 1));
      textB.add(2, new Chr(0, 'S', 2));

      textA.addAfter('0 0', new Chr(1, 'D', 3));
      expect(textA.len()).toBe(4);
      expect(textA.toString()).toBe('DDoS');

      textA.addAfter('0 2', new Chr(1, 's', 4));
      expect(textA.len()).toBe(5);
      expect(textA.toString()).toBe('DDoSs');
    });

    it('insert inter replicas out of order (commutative)', () => {
      textA.add(0, new Chr(0, 'D', 0));
      textA.add(1, new Chr(0, 'o', 1));
      textA.add(2, new Chr(0, 'S', 2));
      textB.add(0, new Chr(0, 'D', 0));
      textB.add(1, new Chr(0, 'o', 1));
      textB.add(2, new Chr(0, 'S', 2));

      textA.addAfter('0 0', new Chr(1, 'D', 3));
      expect(textA.len()).toBe(4);
      expect(textA.toString()).toBe('DDoS');

      textA.addAfter('0 2', new Chr(1, 's', 4));
      expect(textA.len()).toBe(5);
      expect(textA.toString()).toBe('DDoSs');

      textB.addAfter('0 2', new Chr(0, 's', 4));
      expect(textB.len()).toBe(4);
      expect(textB.toString()).toBe('DoSs');

      textB.addAfter('0 0', new Chr(0, 'D', 3));
      expect(textB.len()).toBe(5);
      expect(textB.toString()).toBe('DDoSs');
    });

    it('insert inter replicas on same location (converge on all replicas)', () => {
      textA.add(0, new Chr(0, 'D', 0));
      textA.add(1, new Chr(0, 'o', 1));
      textA.add(2, new Chr(0, 'S', 2));
      textB.add(0, new Chr(0, 'D', 0));
      textB.add(1, new Chr(0, 'o', 1));
      textB.add(2, new Chr(0, 'S', 2));

      textA.add(1, new Chr(0, 'D', 3));
      textB.add(1, new Chr(1, '!', 3));

      textA.addAfter('0 0', new Chr(1, '!', 3));
      expect(textA.len()).toBe(5);
      expect(textA.toString()).toBe('D!DoS');

      textB.addAfter('0 0', new Chr(0, 'D', 3));
      expect(textB.len()).toBe(5);
      expect(textB.toString()).toBe('D!DoS');
    });

    it('delete inter replicas', () => {
      textA.add(0, new Chr(0, 'D', 0));
      textA.add(1, new Chr(0, 'o', 1));
      textA.add(2, new Chr(0, 'S', 2));
      textA.addAfter('0 0', new Chr(1, 'D', 3));
      textA.addAfter('0 2', new Chr(1, 's', 4));
      expect(textA.toString()).toBe('DDoSs');

      textA.removeAt('1 3');
      expect(textA.len()).toBe(4);
      expect(textA.toString()).toBe('DoSs');

      textA.add(1, new Chr(0, 'i', 5));
      expect(textA.len()).toBe(5);
      expect(textA.toString()).toBe('DioSs');

      textA.removeAt('1 4');
      expect(textA.len()).toBe(4);
      expect(textA.toString()).toBe('DioS');
    });

    it('delete inter replicas on same location (idempotent)', () => {
      textA.add(0, new Chr(0, 'D', 0));
      textA.add(1, new Chr(0, 'o', 1));
      textA.add(2, new Chr(0, 'S', 2));

      textB.add(0, new Chr(0, 'D', 0));
      textB.add(1, new Chr(0, 'o', 1));
      textB.add(2, new Chr(0, 'S', 2));

      textA.remove(0);
      expect(textA.len()).toBe(2);
      expect(textA.toString()).toBe('oS');

      textB.remove(0);
      expect(textB.len()).toBe(2);
      expect(textB.toString()).toBe('oS');

      textA.removeAt('0 0');
      expect(textA.len()).toBe(2);
      expect(textA.toString()).toBe('oS');

      textB.removeAt('0 0');
      expect(textB.len()).toBe(2);
      expect(textB.toString()).toBe('oS');
    });
  });

  describe('Content object: Insert & Delete', () => {
    let contentA: Content;
    let contentB: Content;

    beforeEach(() => {
      contentA = new Content(0);
      contentB = new Content(1);
    });

    it('add an inner replica operation', () => {
      contentA.apply(0, 'ins', 'e');
      contentA.apply(1, 'ins', 't');
      contentA.apply(1, 'ins', 'a');
      expect(contentA.len()).toBe(3);
      expect(contentA.toString()).toBe('eat');

      contentA.apply(1, 'del', '');
      expect(contentA.len()).toBe(2);
      expect(contentA.toString()).toBe('et');
      contentA.apply(0, 'del', '');
      expect(contentA.len()).toBe(1);
      expect(contentA.toString()).toBe('t');

      contentA.apply(1, 'ins', 'a');
      expect(contentA.len()).toBe(2);
      expect(contentA.toString()).toBe('ta');

      contentA.apply(1, 'ins', 'e');
      expect(contentA.len()).toBe(3);
      expect(contentA.toString()).toBe('tea');
    });

    it('add inter replica insert with same behaviors', () => {
      contentA.apply(0, 'ins', 'e');
      contentA.apply(1, 'ins', 't');
      contentA.apply(1, 'ins', 'a');
      contentB.apply(0, 'ins', 'e');
      contentB.apply(1, 'ins', 't');
      contentB.apply(1, 'ins', 'a');

      expect(contentA.len()).toBe(3);
      expect(contentA.toString()).toBe('eat');

      expect(contentB.len()).toBe(3);
      expect(contentB.toString()).toBe('eat');

      contentA.applyInsert(new Insert('-1 0', new Chr(1, 'e', 0)));
      expect(contentA.len()).toBe(4);
      expect(contentA.toString()).toBe('eeat');

      contentA.applyInsert(new Insert('1 0', new Chr(1, 'a', 1)));
      expect(contentA.len()).toBe(5);
      expect(contentA.toString()).toBe('eaeat');

      contentA.applyInsert(new Insert('1 1', new Chr(1, 't', 2)));
      expect(contentA.len()).toBe(6);
      expect(contentA.toString()).toBe('eateat');

      contentB.applyInsert(new Insert('-1 0', new Chr(0, 'e', 0)));
      expect(contentB.len()).toBe(4);
      expect(contentB.toString()).toBe('eate');

      contentB.applyInsert(new Insert('0 0', new Chr(0, 'a', 1)));
      expect(contentB.len()).toBe(5);
      expect(contentB.toString()).toBe('eatea');

      contentB.applyInsert(new Insert('0 1', new Chr(0, 't', 2)));
      expect(contentB.len()).toBe(6);
      expect(contentB.toString()).toBe('eateat');
    });

    it('add inter replica insert with different behaviors, each replica should have same output', () => {
      contentA.apply(0, 'ins', 'e');
      contentA.apply(1, 'ins', 't');
      contentA.apply(1, 'ins', 'a');
      contentB.apply(0, 'ins', 'd');
      contentB.apply(1, 'ins', 'o');
      contentB.apply(2, 'ins', 'g');

      expect(contentA.len()).toBe(3);
      expect(contentA.toString()).toBe('eat');

      expect(contentB.len()).toBe(3);
      expect(contentB.toString()).toBe('dog');

      contentA.applyInsert(new Insert('-1 0', new Chr(1, 'd', 0)));
      expect(contentA.len()).toBe(4);
      expect(contentA.toString()).toBe('deat');

      contentA.applyInsert(new Insert('1 0', new Chr(1, 'o', 1)));
      expect(contentA.len()).toBe(5);
      expect(contentA.toString()).toBe('doeat');

      contentA.applyInsert(new Insert('1 1', new Chr(1, 'g', 2)));
      expect(contentA.len()).toBe(6);
      expect(contentA.toString()).toBe('dogeat');

      contentB.applyInsert(new Insert('-1 0', new Chr(0, 'e', 0)));
      expect(contentB.len()).toBe(4);
      expect(contentB.toString()).toBe('doge');

      contentB.applyInsert(new Insert('0 0', new Chr(0, 'a', 1)));
      expect(contentB.len()).toBe(5);
      expect(contentB.toString()).toBe('dogea');

      contentB.applyInsert(new Insert('0 1', new Chr(0, 't', 2)));
      expect(contentB.len()).toBe(6);
      expect(contentB.toString()).toBe('dogeat');
    });

    it('add inter replica delete (idempotent)', () => {
      contentA.apply(0, 'ins', 'e');
      contentA.apply(1, 'ins', 'a');
      contentA.apply(2, 'ins', 't');

      expect(contentA.len()).toBe(3);
      expect(contentA.toString()).toBe('eat');

      contentB.applyInsert(new Insert('-1 0', new Chr(0, 'e', 0)));
      contentB.applyInsert(new Insert('0 0', new Chr(0, 'a', 1)));
      contentB.applyInsert(new Insert('0 1', new Chr(0, 't', 2)));

      expect(contentB.len()).toBe(3);
      expect(contentB.toString()).toBe('eat');

      contentA.apply(1, 'del', '');
      expect(contentA.len()).toBe(2);
      expect(contentA.toString()).toBe('et');

      contentB.apply(1, 'del', '');
      expect(contentB.len()).toBe(2);
      expect(contentB.toString()).toBe('et');

      contentA.applyDelete(new Delete('0 1'));
      expect(contentA.len()).toBe(2);
      expect(contentA.toString()).toBe('et');

      contentB.applyDelete(new Delete('0 1'));
      expect(contentB.len()).toBe(2);
      expect(contentB.toString()).toBe('et');
    });
  });
});
