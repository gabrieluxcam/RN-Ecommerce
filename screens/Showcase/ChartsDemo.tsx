import React from 'react';
import {View, Text, StyleSheet, ScrollView, SafeAreaView, Dimensions} from 'react-native';
import {COLORS, FONTS} from '../../constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Svg, {Circle, Rect, Line, Text as SvgText, G, Path} from 'react-native-svg';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const CHART_WIDTH = SCREEN_WIDTH - 80;

const ChartsDemo = () => {
  const barData = [65, 80, 45, 90, 75, 60];
  const lineData = [30, 45, 40, 60, 50, 70, 65];
  const pieData = [
    {value: 35, color: '#FF6384', label: 'A'},
    {value: 25, color: '#36A2EB', label: 'B'},
    {value: 20, color: '#FFCE56', label: 'C'},
    {value: 20, color: '#4BC0C0', label: 'D'},
  ];

  const maxValue = Math.max(...barData);
  const chartHeight = 200;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="chart-bar" size={40} color={COLORS.primary} />
          <Text style={styles.title}>Charts & Data Visualization</Text>
          <Text style={styles.subtitle}>Built with react-native-svg</Text>
        </View>

        {/* Bar Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bar Chart</Text>
          <Text style={styles.description}>Sales performance by month</Text>
          <View style={styles.chartContainer}>
            <Svg width={CHART_WIDTH} height={chartHeight + 40}>
              {barData.map((value, index) => {
                const barHeight = (value / maxValue) * chartHeight;
                const barWidth = (CHART_WIDTH - 40) / barData.length - 10;
                const x = index * ((CHART_WIDTH - 40) / barData.length) + 20;
                const y = chartHeight - barHeight + 10;

                return (
                  <G key={index}>
                    <Rect
                      x={x}
                      y={y}
                      width={barWidth}
                      height={barHeight}
                      fill={COLORS.primary}
                      opacity={0.8}
                    />
                    <SvgText
                      x={x + barWidth / 2}
                      y={y - 5}
                      fill={COLORS.black}
                      fontSize="12"
                      textAnchor="middle">
                      {value}
                    </SvgText>
                    <SvgText
                      x={x + barWidth / 2}
                      y={chartHeight + 25}
                      fill={COLORS.gray}
                      fontSize="10"
                      textAnchor="middle">
                      M{index + 1}
                    </SvgText>
                  </G>
                );
              })}
              <Line x1="20" y1={chartHeight + 10} x2={CHART_WIDTH - 20} y2={chartHeight + 10} stroke={COLORS.gray} strokeWidth="1" />
            </Svg>
          </View>
        </View>

        {/* Line Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Line Chart</Text>
          <Text style={styles.description}>Growth trend over time</Text>
          <View style={styles.chartContainer}>
            <Svg width={CHART_WIDTH} height={chartHeight + 40}>
              <Path
                d={lineData
                  .map((value, index) => {
                    const x = index * ((CHART_WIDTH - 40) / (lineData.length - 1)) + 20;
                    const y = chartHeight - (value / 100) * chartHeight + 10;
                    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                  })
                  .join(' ')}
                stroke="#2196F3"
                strokeWidth="3"
                fill="none"
              />
              {lineData.map((value, index) => {
                const x = index * ((CHART_WIDTH - 40) / (lineData.length - 1)) + 20;
                const y = chartHeight - (value / 100) * chartHeight + 10;
                return (
                  <G key={index}>
                    <Circle cx={x} cy={y} r="5" fill="#2196F3" />
                    <SvgText x={x} y={y - 10} fill={COLORS.black} fontSize="10" textAnchor="middle">
                      {value}
                    </SvgText>
                  </G>
                );
              })}
              <Line x1="20" y1={chartHeight + 10} x2={CHART_WIDTH - 20} y2={chartHeight + 10} stroke={COLORS.gray} strokeWidth="1" />
            </Svg>
          </View>
        </View>

        {/* Pie Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pie Chart</Text>
          <Text style={styles.description}>Market share distribution</Text>
          <View style={styles.chartContainer}>
            <Svg width={CHART_WIDTH} height={250}>
              <G x={CHART_WIDTH / 2} y={120}>
                {(() => {
                  let currentAngle = -90;
                  const total = pieData.reduce((sum, item) => sum + item.value, 0);
                  const radius = 80;

                  return pieData.map((item, index) => {
                    const angle = (item.value / total) * 360;
                    const startAngle = (currentAngle * Math.PI) / 180;
                    const endAngle = ((currentAngle + angle) * Math.PI) / 180;

                    const x1 = Math.cos(startAngle) * radius;
                    const y1 = Math.sin(startAngle) * radius;
                    const x2 = Math.cos(endAngle) * radius;
                    const y2 = Math.sin(endAngle) * radius;

                    const largeArc = angle > 180 ? 1 : 0;

                    const pathData = [
                      `M 0 0`,
                      `L ${x1} ${y1}`,
                      `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
                      'Z',
                    ].join(' ');

                    const labelAngle = currentAngle + angle / 2;
                    const labelX = Math.cos((labelAngle * Math.PI) / 180) * (radius + 30);
                    const labelY = Math.sin((labelAngle * Math.PI) / 180) * (radius + 30);

                    currentAngle += angle;

                    return (
                      <G key={index}>
                        <Path d={pathData} fill={item.color} />
                        <SvgText x={labelX} y={labelY} fill={COLORS.black} fontSize="12" textAnchor="middle">
                          {item.label}: {item.value}%
                        </SvgText>
                      </G>
                    );
                  });
                })()}
              </G>
            </Svg>
          </View>
        </View>

        {/* Legend */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Legend</Text>
          {pieData.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <View style={[styles.legendColor, {backgroundColor: item.color}]} />
              <Text style={styles.legendText}>
                Category {item.label}: {item.value}%
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    backgroundColor: COLORS.white,
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  title: {
    ...FONTS.h2,
    color: COLORS.black,
    marginTop: 12,
    marginBottom: 8,
  },
  subtitle: {
    ...FONTS.body4,
    color: COLORS.gray,
    textAlign: 'center',
  },
  section: {
    backgroundColor: COLORS.white,
    marginTop: 16,
    padding: 20,
  },
  sectionTitle: {
    ...FONTS.h3,
    color: COLORS.black,
    marginBottom: 8,
  },
  description: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginBottom: 16,
  },
  chartContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  legendColor: {
    width: 20,
    height: 20,
    borderRadius: 4,
    marginRight: 12,
  },
  legendText: {
    ...FONTS.body4,
    color: COLORS.black,
  },
});

export default ChartsDemo;
