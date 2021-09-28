#!/usr/local/bin/perl -w
use strict;
use File::Find;
use Data::Dumper qw/Dumper/;

my $d = $ARGV[0] || '.';
my @paths;
find(sub { push @paths, $File::Find::name }, $d);

my @files;
foreach my $f (@paths) {
  if (-f $f) {
    my @f_stat = stat($f);
    push @files, { file => $f, mtime => $f_stat[9] };
  }
}

print Dumper @files;
