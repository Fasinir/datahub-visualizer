package pl.edu.agh.io.backend;

import java.io.Serializable;
import java.util.List;

public class DataJson implements Serializable {
    private String next;
    private String previous;
    private List results;

    @Override
    public String toString() {
        return "DataJson{" +
                "next='" + next + "\n" +
                ", previous='" + previous + "\n" +
                ", results=" + results +
                '}';
    }

    public String getNext() {
        return next;
    }

    public void setNext(String next) {
        this.next = next;
    }

    public String getPrevious() {
        return previous;
    }

    public void setPrevious(String previous) {
        this.previous = previous;
    }

    public List getResults() {
        return results;
    }

    public void setResults(List results) {
        this.results = results;
    }
}
