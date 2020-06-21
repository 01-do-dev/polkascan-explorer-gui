import {Extrinsic} from '../classes/extrinsic.class';

export default function hasPhalaAttr (attr: Extrinsic["attributes"]) {
  return attr.module_id === 'authorship' && attr.call_id === 'set_uncles';
};
