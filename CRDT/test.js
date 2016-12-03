'use strict';

import {describe, before, it } from 'mocha';
import {should, expect, assert} from 'chai';

import Text from './Text';
import Content from './Content';
import Chr from './Chr';
import Insert from './Insert';
import Delete from './Delete';

describe('My CRDT Test', () => {
  describe('Text object: Insert & Delete', () => {
    let textA;
    let textB;

    beforeEach(() => {
      textA = new Text();
      textB = new Text();
    });

    it('insert inside replica', () => {
      textA.add(0, new Chr(0, 'D', 0));
      expect(textA.len()).to.be.equal(1);
      expect(textA.toString()).to.be.equal('D');

      textA.add(1, new Chr(0, 'i', 1));
      expect(textA.len()).to.be.equal(2);
      expect(textA.toString()).to.be.equal('Di');

      textA.add(2, new Chr(0, 's', 2));
      expect(textA.len()).to.be.equal(3);
      expect(textA.toString()).to.be.equal('Dis');
    });

    it('delete inside replica', () => {
      textA.add(0, new Chr(0, 'D', 0));
      textA.add(1, new Chr(0, 'i', 1));
      textA.add(2, new Chr(0, 's', 2));
      expect(textA.toString()).to.be.equal('Dis');

      textA.remove(0);
      expect(textA.len()).to.be.equal(2);
      expect(textA.toString()).to.be.equal('is');

      textA.remove(1);
      expect(textA.len()).to.be.equal(1);
      expect(textA.toString()).to.be.equal('i');

      textA.add(0, new Chr(0, 'D', 3));
      expect(textA.len()).to.be.equal(2);
      expect(textA.toString()).to.be.equal('Di');

      textA.add(1, new Chr(0, 'i', 4));
      textA.add(2, new Chr(0, 's', 5));
      expect(textA.toString()).to.be.equal('Disi');
    });

    it('insert inter replicas', () => {
      textA.add(0, new Chr(0, 'D', 0));
      textA.add(1, new Chr(0, 'o', 1));
      textA.add(2, new Chr(0, 'S', 2));
      textB.add(0, new Chr(0, 'D', 0));
      textB.add(1, new Chr(0, 'o', 1));
      textB.add(2, new Chr(0, 'S', 2));

      textA.addAfter('0 0', new Chr(1, 'D', 3));
      expect(textA.len()).to.be.equal(4);
      expect(textA.toString()).to.be.equal('DDoS');

      textA.addAfter('0 2', new Chr(1, 's', 4));
      expect(textA.len()).to.be.equal(5);
      expect(textA.toString()).to.be.equal('DDoSs');
    });

    it('insert inter replicas out of order (commutative)', () => {
      textA.add(0, new Chr(0, 'D', 0));
      textA.add(1, new Chr(0, 'o', 1));
      textA.add(2, new Chr(0, 'S', 2));
      textB.add(0, new Chr(0, 'D', 0));
      textB.add(1, new Chr(0, 'o', 1));
      textB.add(2, new Chr(0, 'S', 2));

      textA.addAfter('0 0', new Chr(1, 'D', 3));
      expect(textA.len()).to.be.equal(4);
      expect(textA.toString()).to.be.equal('DDoS');

      textA.addAfter('0 2', new Chr(1, 's', 4));
      expect(textA.len()).to.be.equal(5);
      expect(textA.toString()).to.be.equal('DDoSs');

      textB.addAfter('0 2', new Chr(0, 's', 4));
      expect(textB.len()).to.be.equal(4);
      expect(textB.toString()).to.be.equal('DoSs');

      textB.addAfter('0 0', new Chr(0, 'D', 3));
      expect(textB.len()).to.be.equal(5);
      expect(textB.toString()).to.be.equal('DDoSs');
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
      expect(textA.len()).to.be.equal(5);
      expect(textA.toString()).to.be.equal('D!DoS');

      textB.addAfter('0 0', new Chr(0, 'D', 3));
      expect(textB.len()).to.be.equal(5);
      expect(textB.toString()).to.be.equal('D!DoS');
    });

    it('delete inter replicas', () => {
      textA.add(0, new Chr(0, 'D', 0));
      textA.add(1, new Chr(0, 'o', 1));
      textA.add(2, new Chr(0, 'S', 2));
      textA.addAfter('0 0', new Chr(1, 'D', 3));
      textA.addAfter('0 2', new Chr(1, 's', 4));
      expect(textA.toString()).to.be.equal('DDoSs');

      textA.removeAt('1 3');
      expect(textA.len()).to.be.equal(4);
      expect(textA.toString()).to.be.equal('DoSs');

      textA.add(1, new Chr(0, 'i', 5));
      expect(textA.len()).to.be.equal(5);
      expect(textA.toString()).to.be.equal('DioSs');

      textA.removeAt('1 4');
      expect(textA.len()).to.be.equal(4);
      expect(textA.toString()).to.be.equal('DioS');
    });

    it('delete inter replicas on same location (idempotent)', () => {
      textA.add(0, new Chr(0, 'D', 0));
      textA.add(1, new Chr(0, 'o', 1));
      textA.add(2, new Chr(0, 'S', 2));

      textB.add(0, new Chr(0, 'D', 0));
      textB.add(1, new Chr(0, 'o', 1));
      textB.add(2, new Chr(0, 'S', 2));

      textA.remove(0);
      expect(textA.len()).to.be.equal(2);
      expect(textA.toString()).to.be.equal('oS');

      textB.remove(0);
      expect(textB.len()).to.be.equal(2);
      expect(textB.toString()).to.be.equal('oS');

      textA.removeAt('0 0');
      expect(textA.len()).to.be.equal(2);
      expect(textA.toString()).to.be.equal('oS');

      textB.removeAt('0 0');
      expect(textB.len()).to.be.equal(2);
      expect(textB.toString()).to.be.equal('oS');
    });

  });

  describe('Content object: Insert & Delete', () => {
    let textA;
    let textB;
    let contentA;
    let contentB;

    beforeEach(() => {
      textA = new Text();
      textB = new Text();
      contentA = new Content(0);
      contentB = new Content(1);
    });

    it('add an inner replica operation', () => {
      contentA.apply(0, 'ins', 'e');
      contentA.apply(1, 'ins', 't');
      contentA.apply(1, 'ins', 'a');
      expect(contentA.len()).to.be.equal(3);
      expect(contentA.toString()).to.be.equal('eat');

      contentA.apply(1, 'del', '');
      expect(contentA.len()).to.be.equal(2);
      expect(contentA.toString()).to.be.equal('et');
      contentA.apply(0, 'del', '');
      expect(contentA.len()).to.be.equal(1);
      expect(contentA.toString()).to.be.equal('t');

      contentA.apply(1, 'ins', 'a');
      expect(contentA.len()).to.be.equal(2);
      expect(contentA.toString()).to.be.equal('ta');

      contentA.apply(1, 'ins', 'e');
      expect(contentA.len()).to.be.equal(3);
      expect(contentA.toString()).to.be.equal('tea');
    });

    it('add inter replica insert with same behaviors', () => {
      contentA.apply(0, 'ins', 'e');
      contentA.apply(1, 'ins', 't');
      contentA.apply(1, 'ins', 'a');
      contentB.apply(0, 'ins', 'e');
      contentB.apply(1, 'ins', 't');
      contentB.apply(1, 'ins', 'a');

      expect(contentA.len()).to.be.equal(3);
      expect(contentA.toString()).to.be.equal('eat');

      expect(contentB.len()).to.be.equal(3);
      expect(contentB.toString()).to.be.equal('eat');

      contentA.applyInsert(new Insert('-1 0', new Chr(1, 'e', 0)));
      expect(contentA.len()).to.be.equal(4);
      expect(contentA.toString()).to.be.equal('eeat');

      contentA.applyInsert(new Insert('1 0', new Chr(1, 'a', 1)));
      expect(contentA.len()).to.be.equal(5);
      expect(contentA.toString()).to.be.equal('eaeat');

      contentA.applyInsert(new Insert('1 1', new Chr(1, 't', 2)));
      expect(contentA.len()).to.be.equal(6);
      expect(contentA.toString()).to.be.equal('eateat');

      contentB.applyInsert(new Insert('-1 0', new Chr(0, 'e', 0)));
      expect(contentB.len()).to.be.equal(4);
      expect(contentB.toString()).to.be.equal('eate');

      contentB.applyInsert(new Insert('0 0', new Chr(0, 'a', 1)));
      expect(contentB.len()).to.be.equal(5);
      expect(contentB.toString()).to.be.equal('eatea');

      contentB.applyInsert(new Insert('0 1', new Chr(0, 't', 2)));
      expect(contentB.len()).to.be.equal(6);
      expect(contentB.toString()).to.be.equal('eateat');
    });

    it('add inter replica insert with different behaviors, \n\t each replica should have same output', () => {
      contentA.apply(0, 'ins', 'e');
      contentA.apply(1, 'ins', 't');
      contentA.apply(1, 'ins', 'a');
      contentB.apply(0, 'ins', 'd');
      contentB.apply(1, 'ins', 'o');
      contentB.apply(2, 'ins', 'g');

      expect(contentA.len()).to.be.equal(3);
      expect(contentA.toString()).to.be.equal('eat');

      expect(contentB.len()).to.be.equal(3);
      expect(contentB.toString()).to.be.equal('dog');

      contentA.applyInsert(new Insert('-1 0', new Chr(1, 'd', 0)));
      expect(contentA.len()).to.be.equal(4);
      expect(contentA.toString()).to.be.equal('deat');

      contentA.applyInsert(new Insert('1 0', new Chr(1, 'o', 1)));
      expect(contentA.len()).to.be.equal(5);
      expect(contentA.toString()).to.be.equal('doeat');

      contentA.applyInsert(new Insert('1 1', new Chr(1, 'g', 2)));
      expect(contentA.len()).to.be.equal(6);
      expect(contentA.toString()).to.be.equal('dogeat');

      contentB.applyInsert(new Insert('-1 0', new Chr(0, 'e', 0)));
      expect(contentB.len()).to.be.equal(4);
      expect(contentB.toString()).to.be.equal('doge');

      contentB.applyInsert(new Insert('0 0', new Chr(0, 'a', 1)));
      expect(contentB.len()).to.be.equal(5);
      expect(contentB.toString()).to.be.equal('dogea');

      contentB.applyInsert(new Insert('0 1', new Chr(0, 't', 2)));
      expect(contentB.len()).to.be.equal(6);
      expect(contentB.toString()).to.be.equal('dogeat');
    });

    it('add inter replica delete (idempotent)', () => {
      contentA.apply(0, 'ins', 'e');
      contentA.apply(1, 'ins', 'a');
      contentA.apply(2, 'ins', 't');

      expect(contentA.len()).to.be.equal(3);
      expect(contentA.toString()).to.be.equal('eat');

      contentB.applyInsert(new Insert('-1 0', new Chr(0, 'e', 0)));
      contentB.applyInsert(new Insert('0 0', new Chr(0, 'a', 1)));
      contentB.applyInsert(new Insert('0 1', new Chr(0, 't', 2)));

      expect(contentB.len()).to.be.equal(3);
      expect(contentB.toString()).to.be.equal('eat');

      contentA.apply(1, 'del', '');
      expect(contentA.len()).to.be.equal(2);
      expect(contentA.toString()).to.be.equal('et');

      contentB.apply(1, 'del', '');
      expect(contentB.len()).to.be.equal(2);
      expect(contentB.toString()).to.be.equal('et');

      contentA.applyDelete(new Delete('0 1'));
      expect(contentA.len()).to.be.equal(2);
      expect(contentA.toString()).to.be.equal('et');

      contentB.applyDelete(new Delete('0 1'));
      expect(contentB.len()).to.be.equal(2);
      expect(contentB.toString()).to.be.equal('et');
    });

  });
});
