import CustomEvent from '../Events/CustomEvent';
import Node from '../Nodes/Node';
import NodeSocketRef from '../Nodes/NodeSocketRef';
import Registry from '../Registry';
import Socket from '../Sockets/Socket';
import Variable from '../Variables/Variable';
import { Metadata } from './Metadata';
// Purpose:
//  - stores the node graph

export default class Graph {
  public name: string = '';
  public readonly nodes: { [id:string]: Node} = {};
  public readonly variables: { [id:string]: Variable } = {};
  public readonly customEvents: { [id:string]: CustomEvent} = {};
  public metadata: Metadata = {};

  constructor(public readonly registry: Registry) {
  }

  getInputSocket(nodeSocketRef: NodeSocketRef): Socket {
    const node = this.nodes[nodeSocketRef.nodeId];
    const inputSocket = node.inputSockets.find((socket) => socket.name === nodeSocketRef.socketName);
    if (inputSocket === undefined) throw new Error('all node socket refs must resolve');
    return inputSocket;
  }

  getOutputSocket(nodeSocketRef: NodeSocketRef): Socket {
    const node = this.nodes[nodeSocketRef.nodeId];
    const outputSocket = node.outputSockets.find((socket) => socket.name === nodeSocketRef.socketName);
    if (outputSocket === undefined) throw new Error('all node socket refs must resolve');
    return outputSocket;
  }
}
