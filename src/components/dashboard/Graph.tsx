import { ResponsiveLine } from "@nivo/line";
import GraphModel from "../../models/graph";

interface Props {
  data: GraphModel[];
}

function Graph({ data }: Props) {
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 30, right: 60, bottom: 60, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      enableGridX={false}
      enableGridY={false}
      colors={{ scheme: "category10" }}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      lineWidth={3}
      useMesh={true}
      curve="natural"
    />
  );
}

export default Graph;
