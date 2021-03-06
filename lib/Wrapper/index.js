'use strict';

var React    = require('react')
var assign   = require('object-assign')
var Scroller = require('react-virtual-scroller')

module.exports = React.createClass({

    displayName: 'ReactDataGrid.Wrapper',

    propTypes: {
        scrollLeft   : React.PropTypes.number,
        scrollTop    : React.PropTypes.number,
        scrollbarSize: React.PropTypes.number,
        rowHeight   : React.PropTypes.any,
        renderCount : React.PropTypes.number
    },

    getDefaultProps: function(){
        return {
            scrollLeft: 0,
            scrollTop : 0
        }
    },

    render: function() {

        var props     = this.prepareProps(this.props)
        var rowsCount = props.renderCount

        var groupsCount = 0
        if (props.groupData){
            groupsCount = props.groupData.groupsCount
        }

        rowsCount += groupsCount

        // var loadersSize = props.loadersSize
        var verticalScrollerSize = (props.totalLength + groupsCount) * props.rowHeight// + loadersSize

        var content = props.empty?
            React.createElement("div", {className: "z-empty-text", style: props.emptyTextStyle}, props.emptyText):
            React.createElement("div", React.__spread({},  props.tableProps, {ref: "table"}))


        return React.createElement(Scroller, {
                loadMask: !props.loadMaskOverHeader, 
                loading: props.loading, 

                scrollbarSize: props.scrollbarSize, 

                minVerticalScrollStep: props.rowHeight, 
                scrollTop: props.scrollTop, 
                scrollLeft: props.scrollLeft, 

                height: rowsCount * props.rowHeight, 
                scrollHeight: verticalScrollerSize, 
                scrollWidth: props.minRowWidth, 

                onVerticalScroll: this.onVerticalScroll, 
                onHorizontalScroll: this.onHorizontalScroll
            }, 
            content
        )
    },

    onVerticalScrollOverflow: function() {
    },

    onHorizontalScrollOverflow: function() {
    },

    onHorizontalScroll: function(scrollLeft) {
        this.props.onScrollLeft(scrollLeft)
    },

    onVerticalScroll: function(pos){
        this.props.onScrollTop(pos)
    },

    prepareProps: function(thisProps){
        var props = {}

        assign(props, thisProps)

        return props
    }
})
