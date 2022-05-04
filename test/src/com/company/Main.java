package com.company;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

public class Main {
    public List<Integer> findDuplicates(List<Integer> integers, int numberOfDuplicates) {
        HashMap<Integer, Integer> counter = new HashMap<Integer, Integer>();

         for(Integer value : integers){
             if (counter.containsKey(value)) {
                 counter.put(value, counter.get(value) + 1);
             }
             else {
                 counter.put(value, 0);
             }
         }

        List <Integer> duplicates = new LinkedList<Integer>();

         for(Integer key : counter.keySet()) {
             if(key != null && counter.get(key) == 2) {
                 duplicates.add(key);
             }
         }

        return duplicates;
    }

}
