import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useEffect, useState, useCallback, useRef } from "react";
import Animated from "react-native-reanimated";
import { Dimensions } from "react-native";
import { isTranslateY } from "react-native-redash";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

export default function AnimatedBottomSheet({ translateY }) {
  const bottomSheetModalRef = useRef < BottomSheetModal > null;
  const [isOpen, setIsOpen] = useState(true);
  const snapPoints = ["40%"];
  return (
    <SafeAreaView>
      <BottomSheet snapPoints={snapPoints}>
        <BottomSheetView>
          <Text>HEllo</Text>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
