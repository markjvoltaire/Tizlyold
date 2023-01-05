import { StyleSheet, Text, View, Animated, Dimensions } from "react-native";
import React, { useState, useEffect, useRef } from "react";

import { supabase } from "../../services/supabase";

import { useUser } from "../../context/UserContext";
import ImageHeader from "../post/ImageHeader";

export default function ProfilePostHeader() {
  return (
    <View>
      <Text>ProfilePostHeader</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
