#!/usr/local/bin/perl
use strict;
use Data::Dumper;

sleep 2;
print Dumper({ time => time(), argv => \@ARGV });


