'use strict';

import {describe, before, it } from 'mocha';
import {should, expect, assert} from 'chai';

import Text from './Text';
import Content from './Content';
// import {Insert, Delete} from './Op';
import Chr from './Chr';

describe('Text Object', () => {
  describe('Insert & Delete', () => {
    let text;

    beforeEach(() => {
      text = new Text();
    });

    it('insert inside replica', () => {
      text.add(0, new Chr('dai', 'D', 0));
      expect(text.len()).to.be.equal(1);
      expect(text.toString()).to.be.equal('D');

      text.add(1, new Chr('dai', 'i', 1));
      expect(text.len()).to.be.equal(2);
      expect(text.toString()).to.be.equal('Di');

      text.add(2, new Chr('dai', 's', 2));
      expect(text.len()).to.be.equal(3);
      expect(text.toString()).to.be.equal('Dis');
    });

    it('delete inside replica', () => {
      text.add(0, new Chr('dai', 'D', 0));
      text.add(1, new Chr('dai', 'i', 1));
      text.add(2, new Chr('dai', 's', 2));
      expect(text.toString()).to.be.equal('Dis');

      text.remove(0);
      expect(text.len()).to.be.equal(2);
      expect(text.toString()).to.be.equal('is');

      text.remove(1);
      expect(text.len()).to.be.equal(1);
      expect(text.toString()).to.be.equal('i');
    });

    it('insert inter replicas', () => {
      text.add(0, new Chr('dai', 'D', 0));
      text.add(1, new Chr('dai', 'o', 1));
      text.add(2, new Chr('dai', 'S', 2));

      text.addAfter('dai0', new Chr('rui', 'D', 3));
      expect(text.len()).to.be.equal(4);
      expect(text.toString()).to.be.equal('DDoS');

      text.addAfter('dai2', new Chr('rui', 's', 4));
      expect(text.len()).to.be.equal(5);
      expect(text.toString()).to.be.equal('DDoSs');
    });

    it('delete inter replicas', () => {
      text.add(0, new Chr('dai', 'D', 0));
      text.add(1, new Chr('dai', 'o', 1));
      text.add(2, new Chr('dai', 'S', 2));
      text.addAfter('dai0', new Chr('rui', 'D', 3));
      text.addAfter('dai2', new Chr('rui', 's', 4));
      expect(text.toString()).to.be.equal('DDoSs');

      text.removeAt('rui3');
      expect(text.len()).to.be.equal(4);
      expect(text.toString()).to.be.equal('DoSs');

      text.removeAt('rui4');
      expect(text.len()).to.be.equal(3);
      expect(text.toString()).to.be.equal('DoS');
    });

  });
});
