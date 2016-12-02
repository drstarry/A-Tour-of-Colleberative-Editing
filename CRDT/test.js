'use strict';

import {describe, before, it } from 'mocha';
import {should, expect, assert} from 'chai';

import Text from './Text';
import Content from './Content';
import Chr from './Chr';

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

    it('insert inter replicas on same location (idempotent)', () => {
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

      textA.removeAt('1 4');
      expect(textA.len()).to.be.equal(3);
      expect(textA.toString()).to.be.equal('DoS');
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

  });
});
