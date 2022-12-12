import { Graph } from '../../Graphs/Graph';
import { Socket } from '../../Sockets/Socket';
import { FunctionNode } from '../FunctionNode';
import { NodeDescription } from '../Registry/NodeDescription';

export class In3Out1FuncNode<In1, In2, In3, Out1> extends FunctionNode {
  constructor(
    description: NodeDescription,
    graph: Graph,
    inputValueTypes: string[],
    outputValueType: string,
    public readonly binaryEvalFunc: (a: In1, b: In2, c: In3) => Out1,
    public readonly inputNames: string[] = ['a', 'b', 'c']
  ) {
    if (inputValueTypes.length !== 3) {
      throw new Error(
        `inputValueTypes must have a length of 3, it is instead ${inputValueTypes.length}`
      );
    }
    if (inputNames.length !== 3) {
      throw new Error(
        `inputNames must have a length of 3, it is instead ${inputNames.length}`
      );
    }
    super(
      description,
      graph,
      [
        new Socket(inputValueTypes[0], inputNames[0]),
        new Socket(inputValueTypes[1], inputNames[1]),
        new Socket(inputValueTypes[2], inputNames[2])
      ],
      [new Socket(outputValueType, 'result')],
      () => {
        this.writeOutput(
          'result',
          this.binaryEvalFunc(
            this.readInput(inputNames[0]),
            this.readInput(inputNames[1]),
            this.readInput(inputNames[2])
          )
        );
      }
    );
  }
}
